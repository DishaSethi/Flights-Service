const {Logger} =require('../config' );

class CrudRepository{
    constructor(model){
        this.model=model;
    }

    async create(data){
                const response=await this.model.create(data);
            return response;
    
    }

    async destroy(data){
        try {
         
            const response=await this.model.destroy({

                where:{
                    id:data
                }
            });
            return response;
        } catch (error) {
            Logger.error('something went wrong in the CRUD repo: destroy');
            throw error; 
            
        }
    }

    async get(data){  
        try {
            const response=await this.model.findByPk(data);

                
            
            return response;
        } catch (error) {
            Logger.error('something went wrong in the CRUD repo: get');
            throw error; 
            
        }
    }

    async getAll(){  
        try {
            const response=await this.model.findAll(data);

                
            
            return response;
        } catch (error) {
            Logger.error('something went wrong in the CRUD repo: getAll');
            throw error; 
            
        }
    }
    
    async update(id,data){  //data (object) ->{col:value}
        try {
            const response=await this.model.update(data,{
                where:{
                    id:id
                }
            });

                
            
            return response;
        } catch (error) {
            Logger.error('something went wrong in the CRUD repo: update');
            throw error; 
            
        }
    }
}

module.exports=CrudRepository; 