import { Module } from "@nestjs/common";
import { DEV_ENV, ErrorSerialization } from "Shared/Domain/constants";
import { TabemanoLogger } from "Shared/Infrastructure/Logger/TabemanoLogger";
import { Logger as TsLogger } from "tslog";
import { createStream } from "rotating-file-stream";

const LoggerProvider = {
  provide: 'ITabemanoLogger',
  useFactory: async () => {
    const tsLogger = new TsLogger<ErrorSerialization>({
      name: 'Tabemano',
      prettyLogTemplate: "[{{name}}] - {{dateIsoStr}} {{logLevelName}}:",
      prettyErrorTemplate: "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
      prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
      prettyErrorParentNamesSeparator: ":",
      prettyErrorLoggerNameDelimiter: "\t",
      stylePrettyLogs: true,
      prettyLogStyles: {
        logLevelName: {
          "*": [ "bold", "black", "bgWhiteBright", "dim" ],
          SILLY: [ "bold", "white" ],
          TRACE: [ "bold", "whiteBright" ],
          DEBUG: [ "bold", "green" ],
          INFO: [ "bold", "blue" ],
          WARN: [ "bold", "yellow" ],
          ERROR: [ "bold", "red" ],
          FATAL: [ "bold", "redBright" ],
        },
        dateIsoStr: "white",
        filePathWithLine: "white",
        name: [ "white", "bold" ],
        nameWithDelimiterPrefix: [ "white", "bold" ],
        nameWithDelimiterSuffix: [ "white", "bold" ],
        errorName: [ "bold", "bgRedBright", "whiteBright" ],
        fileName: [ "yellow" ],
      },
    });

    if (process.env.NODE_ENV !== DEV_ENV) {
      const stream = createStream("tabemano.log", {
        size: "10M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip", // compress rotated files
      });

      tsLogger.attachTransport((logObj) => {
        stream.write(JSON.stringify({
          log: logObj[0],
          _meta: logObj._meta
        }) + "\n");
      });
    }

    return new TabemanoLogger(tsLogger);
  },
}

@Module({
  providers: [ LoggerProvider ],
  exports: [ LoggerProvider ],
})
export class LoggerModule {}