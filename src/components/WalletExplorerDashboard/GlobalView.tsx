import { Card } from 'antd'
import { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

const GlobalView = () => {
    // Add and configure Series

    const chart = useRef<am4charts.PieChart | null>(null);

    useLayoutEffect(() => {
        let x = am4core.create('chartdiv', am4charts.PieChart)

        chart.current = x
        chart.current.data = [{
            "coin": "NEAR",
            "amount": 1000
          },
          {
            "coin": "PARAS",
            "amount": 3000
          }
          ];
          
          // Add and configure Series
          var pieSeries = chart.current.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = "amount";
          pieSeries.dataFields.category = "coin";

        return () => {
            x.dispose()
        }
    }, [])

    return (
        <div>
            <div className="flex my-1">
                <Card title="Created At" className="mx-1 w-6/12 text-left">
                    <p>11:20:50 Feb 08 2022</p>
                </Card>
                <Card
                    title="Aurora/Ethereum Linked Address"
                    className="mx-1 w-6/12 text-left"
                >
                    <p>None</p>
                </Card>
            </div>
            <div className="flex">
                <Card title="Portfolio" className="mx-1 w-6/12">
                    <div
                        id="chartdiv"
                        className="h-[250px]"
                    ></div>
                </Card>

                <Card title="Balances" className="mx-1 w-6/12"></Card>
            </div>
        </div>
    )
}
export default GlobalView
