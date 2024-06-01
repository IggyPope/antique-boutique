import { useState } from 'react';

import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

import { Category } from '@commercetools/platform-sdk';

import categories from '@/hooks/useCategories';

const Filters = () => {
  const { getMainCategories, getSubcategories } = categories();
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  const mainCategories = getMainCategories();

  const handleCategoryChange = (id: string) => {
    const subcategories = getSubcategories(id);
    if (!subcategories) {
      return;
    }
    setSubcategories(subcategories);
  };

  return (
    <Stack gap={2}>
      <Typography>Shopping Options</Typography>
      <FormControl variant="standard">
        <InputLabel>Category</InputLabel>
        <Select>
          <MenuItem key="All" value="all" onClick={() => setSubcategories([])}>
            All
          </MenuItem>
          {mainCategories &&
            mainCategories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.name['en-US']}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name['en-US']}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Subcategory</InputLabel>
        <Select disabled={!subcategories.length}>
          {subcategories.map((category) => (
            <MenuItem key={category.id} value={category.name['en-US']}>
              {category.name['en-US']}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filters;
