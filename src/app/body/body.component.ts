import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from '../services/Data.service';
import { Lideres } from '../models/lideres.model';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  form = this.fb.group({
    nome: ['', Validators.required],
    idade: [''],
    foto: [''],
    contato: [''],
    email: [''],
    linguagens: this.fb.array([]),
    frameworks: this.fb.array([]),
    social: this.fb.group({
      facebook: [''],
      instagram: [''],
      github: [''],
      twitter: [''],
      gitlab: ['']
    }),
  })
  
  get linguagens() {
    return this.form.get('linguagens') as FormArray;
  }

  get frameworks() {
    return this.form.get('frameworks') as FormArray;
  }

  modalRef: BsModalRef;
  
  LideresModal:Lideres = new Lideres()

  results:Lideres[] = new Array<Lideres>()

  dtOptions:DataTables.Settings = {}
  
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private dataS:DataService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }
    this.dataS.getData().subscribe((rs)=>{
      this.results = rs
      this.dtTrigger.next();
    })
  }

  addLinguagens(){
    let control = <FormArray> this.form.controls.linguagens

    control.push(
      new FormControl("")
    )
  }

  deleteLinguagens(index:number){
    let control = <FormArray> this.form.controls.linguagens
    control.removeAt(index)
  }

  addFrameworks(){
    let control = <FormArray> this.form.controls.frameworks

    control.push(
      new FormControl("")
    )
  }

  deleteFrameworks(index:number){
    let control = <FormArray> this.form.controls.frameworks
    control.removeAt(index)
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  createModal(create:TemplateRef<any>){
    this.modalRef = this.modalService.show(create);
  }

  delete(lideres:Lideres){
    Swal.fire({
      title: 'Voçe tem certeza?',
      text: "Você não poderá reverter isso!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then((result) => {
      if (result.value) {
        this.dataS.deleteData(lideres).subscribe(rs =>{
          this.ngOnInit()
          Swal.fire(
            'Deletado!',
            'Seu arquivo foi excluído.',
            'success'
          )
        }) 
      }
    })
  }

  editModal(edit:TemplateRef<any>, lideres:Lideres){
    this.LideresModal = lideres
    this.modalRef = this.modalService.show(edit);
    // this.dataS.editData(lideres)
  }

  
}
