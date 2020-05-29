let lol = {
    name:'Viktor',
    fame:'Tursunkulov',
    _age:27,
    setAge(age){
    this._age = age;
    },
    getAge(){
        return this._age
    },
    render(){
        console.log(this.name + ' ' + this.fame + ' ' + this.getAge())}

}

export default lol;