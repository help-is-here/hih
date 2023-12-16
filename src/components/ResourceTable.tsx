import { useEffect, useState } from "react"
import { QueryData } from '@supabase/supabase-js'
import client from "@/database/client";
import TagSection from "@/components/TagSection";

export default function ResourceTable(){
    const resourcesQuery = client.from("resources").select();
    type ResourcesType = QueryData<typeof resourcesQuery>;

    const [data, setData] = useState<ResourcesType>([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const { data, error } = await resourcesQuery;
            if (error) throw error;
            const resources: ResourcesType = data;
            setData(resources)
        }
        fetchData();
    }, [resourcesQuery])
    return (
        <table className='w-full bg-white rounded-lg'>
          <thead className='border border-solid border-0 border-b-8 border-orange-50 '>
            <tr>
                <th className='text-left p-4'>Resource</th>
                <th className='text-left p-4'>Description</th>
                <th className='text-left p-4'>Tags</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(d=>{
              return (
                <tr className='border-orange-50'>
                  <td className='p-4'><a className="text-orange-900 underline" href={d.link}>{d.name}</a></td>
                  <td className='p-4 w-96'>{d.description}</td>
                  <td className='flex w-96 flex-wrap p-4 gap-1'>
                    <TagSection resourceId={d.id}/>
                  </td>
                  <td className='text-xs p-4'>This resource helped <span className='text-lg bg-orange-200 rounded-full px-2 py-1'>{d.num_helped}</span>people</td>
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}