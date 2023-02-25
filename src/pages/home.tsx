import React from 'react'
import { useList } from '@pankod/refine-core'
import { Typography, Box, Stack } from '@pankod/refine-mui'

import PieChart from '../components/layout/charts/PieChart'
import PropertyReferrals from '../components/layout/charts/PropertyReferrals'
import TotalRevenue from '../components/layout/charts/TotalRevenue'
import PropertyCard from '../components/common/PropertyCard'
import TopAgent from '../components/home/TopAgent'


const home = () => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Properties for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={['#475be8', '#f3f6fd']}
                />
                <PieChart
                    title="Properties for Rent"
                    value={550}
                    series={[60, 40]}
                    colors={['#fd8438', '#f3f6fd']}
                />
                <PieChart
                    title="Total Customers"
                    value={5684}
                    series={[75, 25]}
                    colors={['#2fd580', '#f3f6fd']}
                />
                <PieChart
                    title="Total Cities"
                    value={555}
                    series={[75, 25]}
                    colors={['#ff6d8f', '#f3f6fd']}
                />
            </Box>
            <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row' }} gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>
        </Box>
    )
}

export default home
