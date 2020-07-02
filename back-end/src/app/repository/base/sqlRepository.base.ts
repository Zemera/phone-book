
import { injectable, unmanaged } from "inversify";

@injectable()
export class SqlRepositoryBase<T> {

    protected _model: any;

    constructor(@unmanaged() schemaModel: any) {
        this._model = schemaModel;
    }

    create(item: T): Promise<T> {
        return  this._model.create(item);
    }

    retrieve(): Promise<Array<T>> {
        return this._model.findAll({});
    }

    update(id: string, item: T): Promise<T> {

        return this._model.update(
            item,{where: {id: id} ,
            returning: true,
            plain: true}).then(()=>{
              return  this.findById(id);
            })
    }

    delete(id: string): Promise<T> {
        return this._model.destroy({
            where: {
                id:id     
            }
        })
    }

    findById(id: string): Promise<T> {
        return this._model.findAll({
            limit: 1,
            where: {
                id:id
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(function(entries:any[]){
            return entries[0]
          });;
    }

 

}
