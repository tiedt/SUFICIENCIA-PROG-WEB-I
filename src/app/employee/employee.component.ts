import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../_modules/employee.model';
import { EmployeesService } from '../_services/employee.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  employee: Employee;
  registerForm: FormGroup;
  bodyDeleteEmployee = '';
  modoSalvar = 'post';
  titulo = 'Employees';
  idEmployee: number;
  paginaAtual: Number = 1;
  contador: Number = 5;


  constructor(private employeeService: EmployeesService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private storage: StorageService) {
    this.localeService.use('pt-br')
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  ngOnInit() {
    this.validation();
    this.getEmployee();
  }

  editEmployee(employee: Employee, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.idEmployee = employee.id;
    this.employee = Object.assign({}, employee);
    this.registerForm.patchValue(this.employee);
  }
  newEmployee(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }
  deleteEmployee(employee: Employee, template: any) {
    this.openModal(template);
    this.employee = employee;
    this.bodyDeleteEmployee = `Tem certeza que deseja excluir Employee: ${employee.employee_name}, Código: ${employee.id}`;
  }
  confirmeDelete(employee: Employee, template: any) {
    this.employee = Object.assign({ id: employee.id }, this.registerForm.value);
    this.employees.forEach((element, index) => {
      if (element.id == this.employee.id) {
        this.storage.setData('Delete Employee', element);
        this.employees.splice(index, 1);
      }
    });
    template.hide();
    this.toastr.success('Deletado com Sucesso!');
    /* #region service */
    //  this.employeeService.deleteEmployee(this.employee.id).subscribe(
    //    () => {
    //      template.hide();
    //      this.getEmployee();
    //      this.toastr.success('Deletado com Sucesso!');
    //    }, error => {
    //      this.toastr.error('Erro ao Tentar deletar!');
    //    }
    //  );
    /* #endregion service */
  }
  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        let ultimoEmployee = [...this.employees].pop();
        this.employee = Object.assign({ id: ultimoEmployee.id + 1 }, this.registerForm.value);
        this.employees.push(this.employee);
        this.storage.setData('Post Employee', this.employee);
        template.hide();
        this.toastr.success('Inserido com Sucesso!');
        /* #region service */
        //  this.employeeService.postEmployee(this.createEmployee).subscribe(
        //    (novoEvento: Employee) => {
        //      template.hide();
        //      this.getEmployee();
        //      this.toastr.success('Inserido com Sucesso!');
        //    }, error => {
        //      this.toastr.error(`Erro ao Inserir: ${error}`);
        //    }
        //  );
         /* #endregion service */
      } else {
        this.employee = Object.assign({ id: this.idEmployee }, this.registerForm.value);
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === this.employee.id) {
            this.employees[i].employee_name = this.employee.employee_name;
            this.employees[i].employee_age = this.employee.employee_age;
            this.employees[i].employee_salary = this.employee.employee_salary;
            break;
          }

        }
        this.storage.setData('Put Employee', this.employee);
        template.hide();
        this.toastr.success('Editado com Sucesso!');
        /* #region service */
        //  this.employeeService.putEmployee(this.employee).subscribe(
        //    () => {
        //      template.hide();
        //      this.getEmployee();
        //      this.toastr.success('Editado com Sucesso!');
        //    }, error => {
        //      this.toastr.error(`Erro ao Editar: ${error}`);
        //    }
        //  );
        /* #endregion service */
      }
    }
  }
  validation() {
    this.registerForm = this.fb.group({
      employee_name: ['', Validators.required],
      employee_salary: ['', [Validators.required]],
      employee_age: ['', Validators.required],
    });
  }
  getEmployee() {
    var id = sessionStorage.getItem('id');
    this.employeeService.getAllEmployees().subscribe((response) => {
      if (response && response['data']) {
        this.employees = response['data'];
        console.log(this.employee);
      }
    });
  }
}
