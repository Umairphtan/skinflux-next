import BestSellingProducts from '@/components/bestseling'
import FeatureCategories from '@/components/feature'
import HeroSlider from '@/components/homeslider'
import React from 'react'

function page() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeatureCategories></FeatureCategories>
      <BestSellingProducts> </BestSellingProducts>
    </div>
  )
}

export default page