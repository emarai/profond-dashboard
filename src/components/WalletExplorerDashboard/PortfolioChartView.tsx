import { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

const PortfolioChartView = () => {
    const chart = useRef<am4charts.PieChart | null>(null)

    useLayoutEffect(() => {
        let x = am4core.create('chartdiv', am4charts.PieChart)

        chart.current = x
        chart.current.data = [
            {
                coin: 'NEAR',
                amount: 1000,
            },
            {
                coin: 'PARAS',
                amount: 3000,
            },
        ]

        // Add and configure Series
        var pieSeries = chart.current.series.push(new am4charts.PieSeries())
        pieSeries.dataFields.value = 'amount'
        pieSeries.dataFields.category = 'coin'

        return () => {
            x.dispose()
        }
    }, [])

    return <div id="chartdiv" className="h-[250px]"></div>
}

export default PortfolioChartView
