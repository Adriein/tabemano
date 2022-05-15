import React, { useContext, useEffect } from "react";
import { InputWrapper, Input, Grid, Select, Checkbox, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import useList from "../../../../Shared/Hooks/useList";
import { StringHelper } from "../../../../Shared/Services/StringHelper";
import { PricingApiCall } from "../../../Api/Pricing/Pricing";
import { UsersContext } from "../../../Context/UsersContext";
import { Pricing } from "../../../Models/Pricing";

const CreateUserForm = () => {
  const { t, notify } = useContext(UsersContext);
  const [ pricingList, handlers ] = useList([]);

  useEffect(() => {
    (async () => {
      const pricingList = await PricingApiCall.getPricingList();
      handlers.setState(pricingList);
    })()
  }, [])

  return (
    <Grid>
      <Grid.Col span={12}>
        <InputWrapper
          id="input-name"
          required
          label={t('profile:username')}
        >
          <Input id="input-name" placeholder={t('profile:username')}/>
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={12}>
        <InputWrapper
          id="input-email"
          required
          label={t('profile:email')}
        >
          <Input id="input-email" placeholder={t('profile:email')}/>
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={12}>
        <InputWrapper
          id="input-pricing"
          required
          label={t('profile:pricing')}
        >
          <Select
            id="input-pricing"
            placeholder={t('profile:pricing')}
            data={pricingList.map((pricing: Pricing) => ({
              label: StringHelper.firstLetterToUpperCase(pricing.name),
              value: pricing.id
            }))}
          />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={12}>
        <InputWrapper
          id="input-warnings"
          required
          description={t('profile:warning_description')}
          label={t('profile:warnings')}
        >
          <Checkbox
            id="input-warnings"
            label={t('profile:creation_warning')}
          />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col span={12}>
        <Center>
          <Button>{t('clients:create_user')}</Button>
        </Center>
      </Grid.Col>
    </Grid>
  );
}

export default CreateUserForm;