
 export const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
 export const ConvertDictToURLParams = (dict) => {
    console.log(dict)
    let str = [];
    for(let p in dict){
        if (Array.isArray(dict[p])){
            for(let i in dict[p]){
                if(dict[p][i] != "" && dict[p][i] != null){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p][i]));
                }
            }
        }else{
            if(dict[p] != "" && dict[p] != null){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
            }
        }
    }
    console.log(str)
    return str.join("&");
}

