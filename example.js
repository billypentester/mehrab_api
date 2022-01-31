const example = {
    get_all_universities:{
         endpoint : "/api",
         request : "GET",
         description: "This endpoint will list all universities with their respective data",
         example: `localhost/api`
    },
    get_each_univeristy:{
     endpoint : "/api/{university name}",
     request : "GET",
     description: "This endpoint will fetch the data of single university",
     example: `localhost/api/comsats`
    },
    post_university_data:{
     endpoint : "/api/{university name}",
     request : "POST",
     description: "This endpoint will get the university data as input",
     example: `localhost/api`
    },
    update_university_data:{
     endpoint : "/api/{university name}",
     request : "PUT/PATCH",
     description: "This endpoint will get the university name and updated attributes to update the data",
     example: `localhost/api/comsats`
    },
    delete_university_data:{
     endpoint : "/api/{university name}",
     request : "DELETE",
     description: "This endpoint will delete the whole university data",
     example: `localhost/api/comsats`
    }
}

module.exports = example;