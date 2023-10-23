import { atom } from "recoil";
export const globalState = atom({
    key : "globalState" ,
    default : {
        show : false 
    }},
)

export const globalArray  =  atom({
    key : "globalArray" ,
        default : []
})

export const globalCounterValue = atom({
    key : "globalCounterValue" ,
    default : 0
})