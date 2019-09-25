//Importar Modulos do Angular
import { Component, Injector}           from '@angular/core';
import { Validators }                   from "@angular/forms";

import { BaseResourceFormComponent }    from "../../../shared/components/base-resource-form/base-resource-form-component";
//Importar Modulos da Aplicação
import { Category }                     from "../shared/category.model";
import { CategoryService }              from "../shared/category.service";

@Component({
  selector    : 'app-category-form',
  templateUrl : './category-form.component.html',
  styleUrls   : ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>{

  constructor( 
    protected categoryService: CategoryService,
    protected injetor: Injector
  ) { 
    super(injetor, new Category(), categoryService, Category.fromJson)
  }

  protected builderResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  protected creationPageTitle(): String{
    return "Cadastro de Nova Categoria"
  }

  protected editionPageTitle(): String{
    const categoryName = this.resource.name;
    return "Editando Categoria: " + categoryName;
  }

}
