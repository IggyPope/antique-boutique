import { useState } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material';

import { Category } from '@commercetools/platform-sdk';

import MultiplySelect from '@/components/Filters/MultiplySelect';
import categories from '@/hooks/useCategories';

const brandsData = ['Reebok', 'Adidas', 'Nike', 'Lacoste', 'Braun'];
const sizeData = ['S', 'M', 'L', 'One size'];
const colorData = ['Red', 'Blue', 'Green', 'Black', 'White', 'Colorful'];
const MIN_MAX_PRICE = [0, 100];

const Filters = () => {
  const { getMainCategories, getSubcategories } = categories();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSubcategory, setCurrentSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [price, setPrice] = useState<number[]>(MIN_MAX_PRICE);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);

  const mainCategories = getMainCategories();

  const handleCategoryChange = (id: string) => {
    const subcategories = getSubcategories(id);
    if (!subcategories) {
      return;
    }
    setSubcategories(subcategories);
  };

  const resetFilters = () => {
    setCurrentCategory('all');
    setCurrentSubcategory('');
    setSubcategories([]);
    setPrice(MIN_MAX_PRICE);
    setBrands([]);
    setSizes([]);
    setColors([]);
    setInStock(false);
  };

  return (
    <Stack gap={2}>
      <Typography>Shopping Options</Typography>
      <FormControl variant="standard">
        <InputLabel>Category</InputLabel>
        <Select value={currentCategory}>
          <MenuItem key="All" value="all" onClick={() => setSubcategories([])}>
            All
          </MenuItem>
          {mainCategories &&
            mainCategories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.name['en-US']}
                onClick={() => {
                  setCurrentCategory(category.name['en-US']);
                  handleCategoryChange(category.id);
                }}
              >
                {category.name['en-US']}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Subcategory</InputLabel>
        <Select disabled={!subcategories.length} value={currentSubcategory}>
          {subcategories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.name['en-US']}
              onClick={() => setCurrentSubcategory(category.name['en-US'])}
            >
              {category.name['en-US']}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MultiplySelect label="Brand" state={brands} itemsData={brandsData} setState={setBrands} />
      <MultiplySelect label="Size" state={sizes} itemsData={sizeData} setState={setSizes} />
      <MultiplySelect label="Color" state={colors} itemsData={colorData} setState={setColors} />
      <Stack m={1}>
        <Typography ml={-1}>Price Range</Typography>
        <Slider
          value={price}
          onChange={(_, newValue) => {
            if (typeof newValue === 'number') {
              return;
            }
            setPrice(newValue);
          }}
          valueLabelDisplay="auto"
        />
      </Stack>
      <FormControlLabel
        control={<Checkbox checked={inStock} onChange={() => setInStock(!inStock)} />}
        label="In Stock"
      />
      <Stack direction="row" gap={2}>
        <Button variant="contained">Apply Filters</Button>
        <Button variant="outlined" onClick={resetFilters}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default Filters;
