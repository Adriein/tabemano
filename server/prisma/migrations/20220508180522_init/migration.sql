-- CreateTable
CREATE TABLE "ta_user" (
    "us_id" TEXT NOT NULL,
    "us_name" TEXT NOT NULL,
    "us_email" TEXT NOT NULL,
    "us_password" TEXT NOT NULL,
    "us_tenant_id" TEXT NOT NULL,
    "us_role_id" TEXT NOT NULL,
    "us_is_active" BOOLEAN NOT NULL,
    "us_created_at" TIMESTAMP(0) NOT NULL,
    "us_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_user_pkey" PRIMARY KEY ("us_id")
);

-- CreateTable
CREATE TABLE "ta_pricing" (
    "pr_id" TEXT NOT NULL,
    "pr_name" TEXT NOT NULL,
    "pr_duration" SMALLINT NOT NULL,
    "pr_price" DOUBLE PRECISION NOT NULL,
    "pr_tenant_id" TEXT NOT NULL,
    "pr_created_at" TIMESTAMP(0) NOT NULL,
    "pr_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_pricing_pkey" PRIMARY KEY ("pr_id")
);

-- CreateTable
CREATE TABLE "ta_subscription" (
    "su_id" TEXT NOT NULL,
    "su_payment_date" TIMESTAMP(0) NOT NULL,
    "su_valid_to" TIMESTAMP(0) NOT NULL,
    "su_is_active" BOOLEAN NOT NULL,
    "su_is_expired" BOOLEAN NOT NULL,
    "su_duration" SMALLINT NOT NULL,
    "su_price_name" TEXT NOT NULL,
    "su_price" DOUBLE PRECISION NOT NULL,
    "su_pricing_id" TEXT NOT NULL,
    "su_user_id" TEXT NOT NULL,
    "su_created_at" TIMESTAMP(0) NOT NULL,
    "su_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_subscription_pkey" PRIMARY KEY ("su_id")
);

-- CreateTable
CREATE TABLE "ta_subscription_events" (
    "se_id" TEXT NOT NULL,
    "se_event" TEXT NOT NULL,
    "se_subscription_id" TEXT NOT NULL,
    "se_created_at" TIMESTAMP(0) NOT NULL,
    "se_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_subscription_events_pkey" PRIMARY KEY ("se_id")
);

-- CreateTable
CREATE TABLE "ta_role" (
    "ro_id" TEXT NOT NULL,
    "ro_type" TEXT NOT NULL,
    "ro_created_at" TIMESTAMP(0) NOT NULL,
    "ro_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_role_pkey" PRIMARY KEY ("ro_id")
);

-- CreateTable
CREATE TABLE "ta_config" (
    "co_id" TEXT NOT NULL,
    "co_language" TEXT NOT NULL,
    "co_send_notifications" BOOLEAN NOT NULL,
    "co_send_warnings" BOOLEAN NOT NULL,
    "co_user_id" TEXT NOT NULL,
    "co_created_at" TIMESTAMP(0) NOT NULL,
    "co_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_config_pkey" PRIMARY KEY ("co_id")
);

-- CreateTable
CREATE TABLE "ta_app_config" (
    "ac_id" TEXT NOT NULL,
    "ac_warning_delay" SMALLINT NOT NULL,
    "ac_notification_delay" SMALLINT NOT NULL,
    "ac_email_content" TEXT NOT NULL,
    "ac_last_sent_report" TIMESTAMP(0) NOT NULL,
    "ac_user_id" TEXT NOT NULL,
    "ac_created_at" TIMESTAMP(0) NOT NULL,
    "ac_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_app_config_pkey" PRIMARY KEY ("ac_id")
);

-- CreateTable
CREATE TABLE "ta_app_filter" (
    "af_id" TEXT NOT NULL,
    "af_tenant_id" TEXT NOT NULL,
    "af_entity" TEXT NOT NULL,
    "af_field" TEXT NOT NULL,
    "af_values" TEXT[],
    "af_created_at" TIMESTAMP(0) NOT NULL,
    "af_updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "ta_app_filter_pkey" PRIMARY KEY ("af_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ta_user_us_email_key" ON "ta_user"("us_email");

-- CreateIndex
CREATE UNIQUE INDEX "ta_config_co_user_id_key" ON "ta_config"("co_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ta_app_config_ac_user_id_key" ON "ta_app_config"("ac_user_id");

-- AddForeignKey
ALTER TABLE "ta_user" ADD CONSTRAINT "ta_user_us_role_id_fkey" FOREIGN KEY ("us_role_id") REFERENCES "ta_role"("ro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_pricing" ADD CONSTRAINT "ta_pricing_pr_tenant_id_fkey" FOREIGN KEY ("pr_tenant_id") REFERENCES "ta_user"("us_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_subscription" ADD CONSTRAINT "ta_subscription_su_user_id_fkey" FOREIGN KEY ("su_user_id") REFERENCES "ta_user"("us_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_subscription" ADD CONSTRAINT "ta_subscription_su_pricing_id_fkey" FOREIGN KEY ("su_pricing_id") REFERENCES "ta_pricing"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_subscription_events" ADD CONSTRAINT "ta_subscription_events_se_subscription_id_fkey" FOREIGN KEY ("se_subscription_id") REFERENCES "ta_subscription"("su_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_config" ADD CONSTRAINT "ta_config_co_user_id_fkey" FOREIGN KEY ("co_user_id") REFERENCES "ta_user"("us_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_app_config" ADD CONSTRAINT "ta_app_config_ac_user_id_fkey" FOREIGN KEY ("ac_user_id") REFERENCES "ta_user"("us_id") ON DELETE RESTRICT ON UPDATE CASCADE;
