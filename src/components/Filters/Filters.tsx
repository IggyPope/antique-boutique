import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import MultipleSelect from '@/components/Filters/MultipleSelect';
import { APP_SETTINGS } from '@/constants/app';
import categories from '@/hooks/useCategories';
import useProducts from '@/hooks/useProducts';
import { useAppDispatch } from '@/store/hooks';
import {
  resetFilters,
  setAvailability,
  setBrand,
  setCategory,
  setColor,
  setPriceRange,
  setSize,
  setSubcategory,
} from '@/store/slices/filtersSlice';

interface FiltersProps {
  initialCategoryId?: string;
  initialSubcategoryId?: string;
}

const INITIAL_PRICE_RANGE = [0, 100000] as const as [number, number];

const Filters = ({ initialCategoryId, initialSubcategoryId }: FiltersProps) => {
  const navigate = useNavigate();

  const { products } = useProducts();
  const dispatch = useAppDispatch();

  const { getMainCategories, getSubcategories, getCategorySlugById } = categories();
  const mainCategories = getMainCategories();
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategoryId || '');

  const [selectedPrice, setSelectedPrice] = useState<number[]>(INITIAL_PRICE_RANGE);
  const [minPrice, setMinPrice] = useState<number>(INITIAL_PRICE_RANGE[0]);
  const [maxPrice, setMaxPrice] = useState<number>(INITIAL_PRICE_RANGE[1]);

  const [brandsData, setBrandsData] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [sizesData, setSizesData] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [colorsData, setColorsData] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [selectedInStock, setSelectedInStock] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setSubcategories([]);
    } else {
      const subcategories = getSubcategories(selectedCategory);

      if (!subcategories) {
        setSubcategories([]);
      } else {
        setSubcategories(subcategories);
      }
    }
  }, [selectedCategory, getSubcategories]);

  useEffect(() => {
    if (!products || products.facets.prices.type !== 'range') {
      return;
    }

    setMinPrice(products.facets.prices.ranges[0].min / APP_SETTINGS.API_PRICE_RATE);
    setMaxPrice(products.facets.prices.ranges[0].max / APP_SETTINGS.API_PRICE_RATE);
  }, [products]);

  useEffect(() => {
    setSelectedPrice([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (!products || products.facets.brands.type !== 'terms') {
      return;
    }

    setBrandsData(products.facets.brands.terms.map((brand) => brand.term as string));
  }, [products]);

  useEffect(() => {
    if (!products || products.facets.sizes.type !== 'terms') {
      return;
    }

    setSizesData(products.facets.sizes.terms.map((size) => size.term as string));
  }, [products]);

  useEffect(() => {
    if (!products || products.facets.colors.type !== 'terms') {
      return;
    }

    setColorsData(products.facets.colors.terms.map((color) => color.term as string));
  }, [products]);

  const handleApplyFilters = () => {
    selectedCategory === 'all'
      ? dispatch(setCategory(null))
      : dispatch(setCategory(selectedCategory));

    selectedSubcategory === ''
      ? dispatch(setSubcategory(null))
      : dispatch(setSubcategory(selectedSubcategory));

    navigate({
      pathname: `/catalog${selectedCategory !== 'all' ? '/' + getCategorySlugById(selectedCategory) : ''}${selectedSubcategory ? '/' + getCategorySlugById(selectedSubcategory) : ''}`,
    });

    dispatch(setBrand(selectedBrands));
    dispatch(setSize(selectedSizes));
    dispatch(setColor(selectedColors));
    dispatch(
      setPriceRange([
        selectedPrice[0] * APP_SETTINGS.API_PRICE_RATE,
        selectedPrice[1] * APP_SETTINGS.API_PRICE_RATE,
      ]),
    );
    dispatch(setAvailability(selectedInStock));
  };

  const handleResetFilters = () => {
    navigate({
      pathname: '/catalog',
    });

    setSelectedCategory('all');
    setSelectedSubcategory('');
    setSubcategories([]);
    setSelectedPrice([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedInStock(false);

    dispatch(resetFilters());
  };

  return (
    <Stack gap={2}>
      <Typography>Shopping Options</Typography>
      <FormControl variant="standard">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedSubcategory('');
            setSelectedCategory(e.target.value);
          }}
        >
          <MenuItem value="all">All</MenuItem>
          {mainCategories &&
            mainCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name[APP_SETTINGS.LOCALE]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Subcategory</InputLabel>
        <Select
          disabled={!subcategories.length}
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name[APP_SETTINGS.LOCALE]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MultipleSelect
        label="Brand"
        state={selectedBrands}
        itemsData={brandsData}
        setState={setSelectedBrands}
      />
      <MultipleSelect
        label="Size"
        state={selectedSizes}
        itemsData={sizesData}
        setState={setSelectedSizes}
      />
      <MultipleSelect
        label="Color"
        state={selectedColors}
        itemsData={colorsData}
        setState={setSelectedColors}
      />
      <Stack m={1}>
        <Typography ml={-1}>Price Range</Typography>
        <Slider
          value={selectedPrice}
          onChange={(_, newValue) => {
            if (typeof newValue === 'number') {
              return;
            }
            setSelectedPrice(newValue);
          }}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          valueLabelFormat={(value) => `€ ${value}`}
        />
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedInStock}
            onChange={() => setSelectedInStock(!selectedInStock)}
          />
        }
        label="In Stock"
      />
      <Stack direction="row" gap={2}>
        <Button variant="contained" color="secondary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" color="error" onClick={handleResetFilters}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default Filters;
