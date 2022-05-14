import { DatePicker } from "@mantine/dates";
import React, { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import { StyledContainer } from './Styles';
import { FiSearch, FiPlus, FiX } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { useForm, formList } from '@mantine/form';

import { UsersContext } from "../../../../Users/Context/UsersContext";

import { ActionIcon, TextInput, Button, Select, Grid, Group, Popover } from '@mantine/core';
import { debounce } from "lodash";
import { useToggle } from "../../../Hooks/useToggle";
import { FilterCall } from "../../../../Users/Api/Filter";
import { Filter } from "../../../../Users/Models/Filter";
import useList from "../../../Hooks/useList";
import { StringHelper } from "../../../Services/StringHelper";
import { FilterForm, SelectedFilterForm } from "../../../../Users/types";

const TableHeader = () => {
  const { t, addFilter, removeFilter } = useContext(UsersContext);
  const [ values, handlers ] = useList<Filter>([]);

  const [ search, setSearch ] = useState('')
  const [ query, setQuery ] = useState('');
  const [ open, toggle ] = useToggle(false);

  const existingFilter = useForm({
    initialValues: {
      filters: formList<FilterForm>(
        [ { entity: '', fields: [], values: [] } ]),
    },
  });

  const selectedFilter = useForm({
    initialValues: {
      filters: formList<SelectedFilterForm>([ { entity: '', field: '', value: '' } ]),
    },
  });

  const debounceQueryMemo = useMemo(() => debounce(setQuery, 500), []);

  useEffect(() => {
    (async () => {
      const filterList = await FilterCall.getClientTableFilters();
      handlers.setState(filterList);
    })();

  }, [ query ]);

  const handleSearchUser = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    debounceQueryMemo(event.currentTarget.value);

  }

  const getEntities = (): { value: string, label: string }[] => {
    return values?.map((filter: Filter) => ({
      value: filter.entity,
      label: StringHelper.firstLetterToUpperCase(filter.entity)
    }));
  }

  const handleEntitySelection = (index: number) => (entity: string) => {
    const filter = handlers.get((filter: Filter) => filter.entity === entity);
    const fields = Object.keys(filter!.fields).map((key: string) => {
      return {
        value: key,
        label: StringHelper.removeSnakeCase(key)
      }
    });

    existingFilter.setListItem('filters', index, { entity, fields: fields, values: [] });
    selectedFilter.setListItem('filters', index, { entity: entity, field: '', value: '' });
  }

  const handleFieldSelection = (index: number, entity: string) => (field: string) => {
    const filter = handlers.get((filter: Filter) => filter.entity === entity);

    const values = filter!.fields[field].map((value: string) => ({
      value,
      label: StringHelper.removeSnakeCase(value)
    }))

    existingFilter.setListItem(
      'filters',
      index,
      {
        entity,
        fields: existingFilter.getListInputProps('filters', index, 'fields').value,
        values: values
      }
    );

    selectedFilter.setListItem('filters', index, { entity: entity, field: field, value: '' });
  }

  const handleValueSelection = (index: number, entity: string) => (value: string) => {
    selectedFilter.setListItem(
      'filters',
      index,
      {
        entity: entity,
        field: selectedFilter.getListInputProps('filters', index, 'field').value,
        value: value
      }
    );

    addFilter({ entity: entity, field: selectedFilter.getListInputProps('filters', index, 'field').value, value });
  }

  const handleAddNewFilter = () => {
    existingFilter.addListItem('filters', { entity: '', fields: [], values: [] });
    selectedFilter.addListItem('filters', { entity: '', field: '', value: '' });
  }

  const handleRemoveFilter = (index: number) => () => {
    if (index === 0) {
      selectedFilter.setListItem('filters', index, { entity: '', field: '', value: '' });
      removeFilter(selectedFilter.values.filters[index])
      return;
    }
    existingFilter.removeListItem('filters', index);
    selectedFilter.removeListItem('filters', index);
    removeFilter(selectedFilter.values.filters[index])
  }

  return (
    <StyledContainer>
      <Grid>
        <Grid.Col span={3}>
          <TextInput
            placeholder={t('clients:search_filter_placeholder')}
            icon={<FiSearch/>}
            size={'sm'}
            value={search}
            onChange={handleSearchUser}
          />
        </Grid.Col>
        <Grid.Col span={6} offset={3}>
          <Group position="right">
            <Popover
              closeOnClickOutside
              closeOnEscape
              title="Manage Filters"
              position="bottom"
              placement="end"
              opened={open}
              onClose={() => toggle()}
              target={
                <ActionIcon
                  color="dark"
                  variant="default"
                  size="lg"
                  onClick={toggle}
                >
                  <IoIosOptions/>
                </ActionIcon>
              }>
              <Grid>
                <Grid.Col span={12}>
                  {existingFilter.values.filters.map((_, index: number) => {
                    return (
                      <Grid columns={13} justify="center" align="center" key={index}>
                        <Grid.Col span={4}>
                          <Select
                            withinPortal={false}
                            placeholder="Select available entity"
                            value={selectedFilter.getListInputProps('filters', index, 'entity').value}
                            data={getEntities()}
                            onChange={handleEntitySelection(index)}
                          />
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Select
                            withinPortal={false}
                            placeholder="Select available field"
                            disabled={!selectedFilter.getListInputProps('filters', index, 'entity').value}
                            value={selectedFilter.getListInputProps('filters', index, 'field').value}
                            data={existingFilter.getListInputProps('filters', index, 'fields').value}
                            onChange={handleFieldSelection(
                              index,
                              existingFilter.getListInputProps('filters', index, 'entity').value
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={4}>
                          {selectedFilter.getListInputProps(
                            'filters',
                            index,
                            'field'
                          ).value === 'payment_date' || selectedFilter.getListInputProps(
                            'filters',
                            index,
                            'field'
                          ).value === 'valid_to' ? (
                            <DatePicker
                              placeholder={t('profile:pick_date_placeholder')}
                              withinPortal={false}
                              value={selectedFilter.getListInputProps('filters', index, 'value').value}
                              onChange={(value: Date | null) => {
                                if (!value) {
                                  return;
                                }
                                handleValueSelection(
                                  index,
                                  existingFilter.getListInputProps('filters', index, 'entity').value
                                )(value.toDateString())
                              }}
                              required
                            />
                          ) : (
                            <Select
                              withinPortal={false}
                              placeholder="Select available value"
                              disabled={!selectedFilter.getListInputProps('filters', index, 'field').value}
                              value={selectedFilter.getListInputProps('filters', index, 'value').value}
                              data={existingFilter.getListInputProps('filters', index, 'values').value}
                              onChange={handleValueSelection(
                                index,
                                existingFilter.getListInputProps('filters', index, 'entity').value
                              )}
                            />
                          )}
                        </Grid.Col>
                        <Grid.Col span={1}>
                          <ActionIcon style={{ width: '100%' }} onClick={handleRemoveFilter(index)}>
                            <FiX/>
                          </ActionIcon>
                        </Grid.Col>
                      </Grid>
                    );
                  })}
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button variant={'default'} leftIcon={<FiPlus/>} size={"xs"} onClick={handleAddNewFilter}>
                    Add a new filter
                  </Button>
                </Grid.Col>
              </Grid>
            </Popover>
            <Button variant={'default'} leftIcon={<FiPlus/>}>
              {t('clients:create_user')}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </StyledContainer>
  )
    ;
}

export default TableHeader;