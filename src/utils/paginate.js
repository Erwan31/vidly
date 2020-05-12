import _ from 'lodash';


export function paginate (items, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;

    //Lodash wrapper
    return _(items).slice(startIndex).take(pageSize).value();
    //_.slice(items, startIndex);
    //_.take(items, pageSize);
}

export function generate (items, name){

    function filterGenre(item){
        if( item.name === name) return item;
    }
    const filtered = items.map(filterGenre);

    return filtered;
}