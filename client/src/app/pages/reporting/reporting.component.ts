import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IReportFilter } from 'src/app/shared/models/report-filter.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent implements OnInit {
  reportFilters!: IReportFilter;
  pageTitle: string = ' Inventory Reporting';
  errorMessage: any;
  error = false;
  reportParamsFg: FormGroup;
  skuFilter: AbstractControl;
  manufacturerFilter: AbstractControl;
  productFilter: AbstractControl;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private productsService: ProductService
  ) {
    this.reportParamsFg = this.fb.group({
      skuFilter: ['', Validators.compose([Validators.maxLength(30)])],
      manufacturerFilter: ['', Validators.compose([Validators.minLength(30)])],
      productFilter: ['', Validators.compose([Validators.maxLength(30)])],
    });
    this.skuFilter = this.reportParamsFg.controls['skuFilter'];
    this.manufacturerFilter =
      this.reportParamsFg.controls['manufacturerFilter'];
    this.productFilter = this.reportParamsFg.controls['productFilter'];
  }

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/']);
  }

  focusFunction() {
    this.error = false;
  }

  generateReportFilterFromForm(): IReportFilter {
    var f = {
      sku: this.skuFilter.value,
      manufacturer: this.manufacturerFilter.value,
      productName: this.productFilter.value,
    };
    return f;
  }

  onSubmit(product: any) {
    this.reportFilters = this.generateReportFilterFromForm();
    this.productsService.retrieveProductReport(this.reportFilters);
    console.log(this.reportFilters);
    this.openSnackBar('success', 'Close');
    // this.router.navigate(['/']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
