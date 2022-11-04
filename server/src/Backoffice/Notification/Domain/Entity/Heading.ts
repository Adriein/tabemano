import { Email } from "Shared/Domain/Vo/Email.vo";

export class Heading {
  constructor(
    private readonly _from: Email,
    private readonly _to: Email[],
    private readonly _subject: string,
    private readonly _carbonCopy?: Email[],
    private readonly _blindCarbonCopy?: Email[],
  ) {}


  public from(): Email {
    return this._from;
  }

  public to(): Email[] {
    return this._to;
  }
  
  public subject(): string {
    return this._subject;
  }

  public carbonCopy(): Email[] | undefined {
    return this._carbonCopy;
  }

  public blindCarbonCopy(): Email[] | undefined {
    return this._blindCarbonCopy;
  }
}