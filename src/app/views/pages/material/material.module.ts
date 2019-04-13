import { CardListComponent } from './common-behaviors/card-list/card-list.component';
import { TreeFieldComponent } from './common-behaviors/tree-field/tree-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { AutocompleteComponent } from './formcontrols/autocomplete/autocomplete.component';
import { CheckboxComponent } from './formcontrols/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodePreviewModule } from '../../partials/content/general/code-preview/code-preview.module';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import {
	MatAutocompleteModule,
	MatNativeDateModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatSelectModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatSliderModule,
	MatPaginatorModule,
	MatSortModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatStepperModule,
	MatToolbarModule,
	MatDividerModule,
	MatTabsModule,
	MatTableModule,
	MatTooltipModule,
	MatListModule,
	MatGridListModule,
	MatButtonToggleModule,
	MatBottomSheetModule,
	MatExpansionModule,
	_MatChipListMixinBase,
	MatMenuModule,
	MatTreeModule,
	MAT_BOTTOM_SHEET_DATA,
	MatBottomSheetRef,
	MAT_DATE_LOCALE,
	MAT_DATE_FORMATS,

} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';


// Form controls
import { DatepickerComponent } from './formcontrols/datepicker/datepicker.component';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { FormfieldComponent } from './formcontrols/formfield/formfield.component';
import { InputComponent } from './formcontrols/input/input.component';
import { RadiobuttonComponent } from './formcontrols/radiobutton/radiobutton.component';
import { SelectComponent } from './formcontrols/select/select.component';
import { SliderComponent } from './formcontrols/slider/slider.component';
import { SlidertoggleComponent } from './formcontrols/slidertoggle/slidertoggle.component';
// Navigation
import { MenuComponent } from './navigation/menu/menu.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
// Layout
import { CardComponent } from './layout/card/card.component';
import { DividerComponent } from './layout/divider/divider.component';
import { ExpansionPanelComponent } from './layout/expansion-panel/expansion-panel.component';
import { GridListComponent } from './layout/grid-list/grid-list.component';
import { ListComponent } from './layout/list/list.component';
import { MaterialTabsComponent } from './layout/material-tabs/material-tabs.component';
import { StepperComponent } from './layout/stepper/stepper.component';
import { TreeComponent } from './layout/tree/tree.component';
import { DefaultFormsComponent } from './layout/default-forms/default-forms.component';
// Buttons & indicators
import { ButtonComponent } from './buttons-and-indicators/button/button.component';
import { ButtonToggleComponent } from './buttons-and-indicators/button-toggle/button-toggle.component';
import { ChipsComponent } from './buttons-and-indicators/chips/chips.component';
import { IconComponent } from './buttons-and-indicators/icon/icon.component';
import { ProgressBarComponent } from './buttons-and-indicators/progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './buttons-and-indicators/progress-spinner/progress-spinner.component';
import { RipplesComponent } from './buttons-and-indicators/ripples/ripples.component';
// Popups & modals
import { DialogComponent, ModalComponent, Modal2Component, Modal3Component } from './popups-and-modals/dialog/dialog.component';
import { SnackbarComponent } from './popups-and-modals/snackbar/snackbar.component';
import { MaterialTooltipComponent } from './popups-and-modals/material-tooltip/material-tooltip.component';
import { BottomSheetComponent } from './popups-and-modals/bottom-sheet/bottom-sheet.component';
import { BottomSheetExampleComponent } from './popups-and-modals/bottom-sheet/bottom-sheet-example/bottom-sheet-example.component';
import { PizzaPartyComponent } from './popups-and-modals/snackbar/pizza-party.component';
// Data table
import { PaginatorComponent } from './data-table/paginator/paginator.component';
import { SortHeaderComponent } from './data-table/sort-header/sort-header.component';
import { MaterialTableComponent } from './data-table/material-table/material-table.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DragDropComponent } from './common-behaviors/drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalBottomSheetComponent } from './controls/modal-bottom-sheet/modal-bottom-sheet.component';
import { ModalDialogComponent } from './controls/modal-dialog/modal-dialog.component';

const routes: Routes = [
	{
		path: '',
		component: MaterialComponent,
		children: [
			{
				path: 'form-controls/autocomplete',
				component: AutocompleteComponent
			},
			{
				path: 'form-controls/checkbox',
				component: CheckboxComponent
			},
			{
				path: 'form-controls/datepicker',
				component: DatepickerComponent
			},
			{
				path: 'form-controls/formfield',
				component: FormfieldComponent
			},
			{
				path: 'form-controls/input',
				component: InputComponent
			},
			{
				path: 'form-controls/radiobutton',
				component: RadiobuttonComponent
			},
			{
				path: 'form-controls/select',
				component: SelectComponent
			},
			{
				path: 'form-controls/slider',
				component: SliderComponent
			},
			{
				path: 'form-controls/slidertoggle',
				component: SlidertoggleComponent
			},
			{
				path: 'navigation/menu',
				component: MenuComponent
			},
			{
				path: 'navigation/sidenav',
				component: SidenavComponent
			},
			{
				path: 'navigation/toolbar',
				component: ToolbarComponent
			},
			{
				path: 'layout/card',
				component: CardComponent
			},
			{
				path: 'layout/divider',
				component: DividerComponent
			},
			{
				path: 'layout/expansion-panel',
				component: ExpansionPanelComponent
			},
			{
				path: 'layout/grid-list',
				component: GridListComponent
			},
			{
				path: 'layout/list',
				component: ListComponent
			},
			{
				path: 'layout/tabs',
				component: MaterialTabsComponent
			},
			{
				path: 'layout/stepper',
				component: StepperComponent
			},
			{
				path: 'layout/default-forms',
				component: DefaultFormsComponent
			},
			{
				path: 'layout/tree',
				component: TreeComponent
			},
			{
				path: 'buttons-and-indicators/button',
				component: ButtonComponent
			},
			{
				path: 'buttons-and-indicators/button-toggle',
				component: ButtonToggleComponent
			},
			{
				path: 'buttons-and-indicators/chips',
				component: ChipsComponent
			},
			{
				path: 'buttons-and-indicators/icon',
				component: IconComponent
			},
			{
				path: 'buttons-and-indicators/progress-bar',
				component: ProgressBarComponent
			},
			{
				path: 'buttons-and-indicators/progress-spinner',
				component: ProgressSpinnerComponent
			},
			{
				path: 'buttons-and-indicators/ripples',
				component: RipplesComponent
			},
			{
				path: 'popups-and-modals/bottom-sheet',
				component: BottomSheetComponent
			},
			{
				path: 'popups-and-modals/dialog',
				component: DialogComponent
			},
			{
				path: 'popups-and-modals/snackbar',
				component: SnackbarComponent
			},
			{
				path: 'popups-and-modals/tooltip',
				component: MaterialTooltipComponent
			},
			{
				path: 'data'
			},
			{
				path: 'data-table/paginator',
				component: PaginatorComponent
			},
			{
				path: 'data-table/sort-header',
				component: SortHeaderComponent
			},
			{
				path: 'data-table/table',
				component: MaterialTableComponent
			}
		]
	}
];

@NgModule({
	imports: [
		// material modules
		DragDropModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatDialogModule,
		MatRippleModule,
		CoreModule,
		CommonModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		PartialsModule,
		MaterialPreviewModule,
		FormsModule,
		ReactiveFormsModule,
		CodePreviewModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule,
		DragDropComponent,
		TreeFieldComponent,
		CardListComponent,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	entryComponents: [
		PizzaPartyComponent,
		DialogComponent,
		ModalComponent,
		Modal2Component,
		Modal3Component,
		IconComponent,
		TreeComponent,
		BottomSheetExampleComponent,
		ModalBottomSheetComponent,
		ModalDialogComponent
	],
	providers: [
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

	],
	declarations: [
		MaterialComponent,
		AutocompleteComponent,
		CheckboxComponent,
		DatepickerComponent,
		FormfieldComponent,
		InputComponent,
		RadiobuttonComponent,
		SelectComponent,
		SliderComponent,
		SlidertoggleComponent,
		MenuComponent,
		SidenavComponent,
		ToolbarComponent,
		CardComponent,
		DividerComponent,
		ExpansionPanelComponent,
		GridListComponent,
		ListComponent,
		MaterialTabsComponent,
		StepperComponent,
		ButtonComponent,
		ButtonToggleComponent,
		ChipsComponent,
		IconComponent,
		ProgressBarComponent,
		ProgressSpinnerComponent,
		DialogComponent,
		ModalComponent,
		Modal2Component,
		Modal3Component,
		PizzaPartyComponent,
		SnackbarComponent,
		MaterialTooltipComponent,
		PaginatorComponent,
		SortHeaderComponent,
		MaterialTableComponent,
		DefaultFormsComponent,
		TreeComponent,
		TreeFieldComponent,
		BottomSheetComponent,
		BottomSheetExampleComponent,
		RipplesComponent,
		DragDropComponent,
		ModalBottomSheetComponent,
		ModalDialogComponent,
		CardListComponent
	]
})
export class MaterialModule {}
