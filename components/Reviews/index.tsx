import ItemReview from '@/components/Reviews/ItemReview';
import { Review } from '@/types/global';
import { Stack } from '@mui/material';
import React from 'react';

const Reviews: React.FC<{ data: Review[] }> = ({ data }) => {
  return (
    <Stack spacing={4} overflow="hidden">
      <h2 className="text-sm font-semibold text-[#e5e5e5] md:text-2xl">
        Reviews
      </h2>
      <Stack>
        {data.map((review) => (
          <ItemReview key={review.id} review={review} />
        ))}
        {data.length === 0 && <p>The film has no reviews yet</p>}
      </Stack>
    </Stack>
  );
};

export default Reviews;
