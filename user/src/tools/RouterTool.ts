import { RouteRecordRaw } from 'vue-router'
import {deepCopy} from '@/tools/copy.ts'

function filteRoutes(userRoutes: any, allRoutes: any):any{
    let routes:any = [], allRoutesCopy: any = deepCopy(allRoutes)
    for(let userR of userRoutes){
        for(let allR of allRoutesCopy){
            if(userR.name == allR.name){
                if(userR?.children?.length > 0){
                  allR.children = filteRoutes(userR.children,allR.children)
                }
                else delete allR.children
                routes.push(allR)
            }
        }
    }
    return routes
}

export {
    filteRoutes,
}