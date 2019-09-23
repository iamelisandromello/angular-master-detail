//Importar Modulos do Angular
import { Component, OnInit, AfterContentChecked }           from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators }  from "@angular/forms";
import { ActivatedRoute, Router }                           from "@angular/router";
//Importar Modulos da Aplicação
import { Category }                                         from "../shared/category.model";
import { CategoryService }                                  from "../shared/category.service";
//Importar Modulos de bibliotecas
import { switchMap }                                        from "rxjs/operators";
import { toBase64String } from '@angular/compiler/src/output/source_map';

import toastr from "toastr";

@Component({
  selector    : 'app-category-form',
  templateUrl : './category-form.component.html',
  styleUrls   : ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction       : String;
  categoryForm        : FormGroup;
  pageTitle           : String;
  serverErrorMessage  : String[]  = null;
  submittingForm      : boolean   = false;
  category            : Category  = new Category();

  constructor( 
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.builderCategoryForm();    
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'new') {
      this.createCategory();
    }
    else {
      this.updateCategory();
    }
  }

  //Privates Methods
  private setCurrentAction(){
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = 'new';
    }
    else {
      this.currentAction = 'edit';
    }
  }

  private builderCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }
  
  private loadCategory() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) //binds loaded category  data to CategoryForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      )
    }  
  }

  private setPageTitle(){
    if (this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria'
    }
    else {
      const categoryName = this.category.name ||  "";
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

  private createCategory(){
    const category : Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.cretae(category).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionForError(error)
    )
  }

  private updateCategory() {
    const category : Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionForError(error)
    )
  }

  private actionsForSuccess(category: Category) {
    toastr.success("Solicitação processada com sucesso!!");

    this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
      () => this.router.navigate(["categories", category.id, "edit"])
    )
  }

  private actionForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!!");
    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessage = JSON.parse(error._body).errors;
    else
      this.serverErrorMessage = ["Falha na comunicação com o servidor. Por Favor tente mais tarde"]
  }

}
