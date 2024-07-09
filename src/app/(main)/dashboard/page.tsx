'use client';

import React, { useState } from 'react';

import FilterButton from '@/components/filter-button';
import MainContent from '@/components/main-content';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import SearchBox from '@/components/search-box';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ArrowDownAZ, Heart, Search, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [selectedSort, setSelectedSort] = useState<string>('recentlyAdded');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const getUniqueTags = useQuery(api.portfolios.getUniqueTags);
  const uniqueTags = ['All', ...(getUniqueTags ?? [])];
  const [searchValue, setSearchValue] = useState('');

  return (
    <MaxWidthWrapper>
      <span className="text-2xl md:text-4xl font-bold">Dashboard</span>
      <div className="pb-6 relative">
        <div className="flex flex-col gap-4 pt-6 items-start md:flex-row md:justify-between md:items-center pb-4 sticky top-16 bg-background z-10">
          {/* Filter */}
          <div className="relative overflow-x-auto w-full justify-start flex">
            {uniqueTags.map((tag) => {
              return (
                <FilterButton
                  key={tag}
                  label={tag}
                  isSelected={selectedFilter === tag}
                  onClick={() => {
                    setSelectedFilter(tag);
                  }}
                />
              );
            })}
          </div>
          {/* Select  */}
          <div className="flex w-full md:w-fit justify-end items-center gap-2">
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <Select
              defaultValue="recentlyAdded"
              value={selectedSort}
              onValueChange={setSelectedSort}
            >
              <SelectTrigger className="md:w-[190px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-xs">
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="recentlyAdded">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} />
                      <span>Recently Added</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mostPopular">
                    <div className="flex items-center gap-2">
                      <Heart size={16} />
                      <span>Most Popular</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="alphabetical">
                    <div className="flex items-center gap-2">
                      <ArrowDownAZ size={16} />
                      <span>Alphabetical</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <MainContent
          selectedSort={selectedSort}
          selectedFilter={selectedFilter}
          searchValue={searchValue}
        />
      </div>
    </MaxWidthWrapper>
  );
}
