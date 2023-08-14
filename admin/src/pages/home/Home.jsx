import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData.js"
import WidgetSm from "../../widgetSm/WidgetSm";
import WidgetLg from "../../widgetLg/WidgetLg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";

export default function Home() {
  const MONTHS = useMemo(()=> [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", 
    "Nov", "Dec"], 
    [])

  const [userStats, setUserStats] = useState([])

  useEffect(()=>{
    const getStats = async ()=>{
        try{
            const res = await axios.get("users/stats",
            {headers:{
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2FiODQyOWI5ZjNlZjc0MTc4ZjdjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTM5ODcxMSwiZXhwIjoxNjkxODMwNzExfQ.lbEgicaMuMpCN6Sy4BqwwvmchmHz991fja_PFn0GVFo"
            },})
            const statList = res.data.sort( function (a, b) {
              return a._id - b._id;
            })
            statList.map(item => setUserStats(prev=>[...prev, {name: MONTHS[item._id-1], "New User": item.total} ]))
        }catch(err){
            console.log(err)
        }
    }
    getStats()
  },[])

  return (
    <div className="home">
        <FeaturedInfo />
        <Chart title="User Analytics" data={userStats} grid={true} dataKey="New User" />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
    </div>
  )
}
