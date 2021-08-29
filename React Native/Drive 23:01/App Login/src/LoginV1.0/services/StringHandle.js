export function AbreviarNome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [nome, ...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([nome, ...abr,latName].join(' ').length> limit) {
            return [nome, ...abreviaturas].join(' ');
        } else {
            return [nome, ...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function AbreviarSobrenome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([...abr,latName].join(' ').length> limit) {
            return [...abreviaturas].join(' ');
        } else {
            return [...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function Colocar3dots(value,maxlimit) {

    if ((value).length > maxlimit) {
        return (((value).substring(0,maxlimit-3)) + '...')
    } else {
        return value
    }
            
}