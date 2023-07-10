export enum ParamType{
  BodyParam = 1,
  QueryParam = 2,
  HeaderParam = 3,
}

export default class ParamModel{
  constructor(key: string, value: any, type: ParamType){
    this.key = key;
    this.value = value;
    this.type = type;
  }
  key?: string;
  value: any;
  type?: ParamType
}