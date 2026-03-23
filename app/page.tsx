import BestSellingProducts from '@/components/bestseling'
import ShopByBrand from '@/components/bybrand'
import FeatureCategories from '@/components/feature'
import HeroSlider from '@/components/homeslider'
import WhyChooseUs from '@/components/whychose'
import React from 'react'

function page() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeatureCategories></FeatureCategories>
      <ShopByBrand></ShopByBrand>
      <BestSellingProducts> </BestSellingProducts>
      <WhyChooseUs></WhyChooseUs>
    </div>
  )
}

export default page