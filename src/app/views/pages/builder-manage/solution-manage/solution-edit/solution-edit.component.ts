import { SolutionService } from "../../../../../core/_services/kt-solution-services/solution.service";
import { filter } from "rxjs/operators";
import { SolutionModel } from "../../../../../core/_model-app/solution.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
// NGRX
import { Store, select } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { AppState } from "../../../../../core/reducers";
// Layout
import {
	SubheaderService,
	LayoutConfigService
} from "../../../../../core/_base/layout";
import {
	LayoutUtilsService,
	MessageType
} from "../../../../../core/_base/crud";
// Services and Models
import {
	User,
	UserUpdated,
	Address,
	SocialNetworks,
	selectHasUsersInStore,
	selectUserById,
	UserOnServerCreated,
	selectLastCreatedUserId,
	selectUsersActionLoading
} from "../../../../../core/auth";

@Component({
	selector: "kt-solution-edit",
	templateUrl: "./solution-edit.component.html",
	styleUrls: ["./solution-edit.component.scss"]
})
export class SolutionEditComponent implements OnInit, OnDestroy {
	// Public properties
	previewImage: string = "";
	isShowFormEdit: boolean = false;
	solution: SolutionModel;
	user: User;
	userId$: Observable<number>;
	oldUser: User;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number[]>([]);
	addressSubject = new BehaviorSubject<Address>(new Address());
	soicialNetworksSubject = new BehaviorSubject<SocialNetworks>(
		new SocialNetworks()
	);
	rfSolution: FormGroup;
	hasFormErrors: boolean = false;
	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private solutionFB: FormBuilder,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private layoutConfigService: LayoutConfigService,
		private _solutionService: SolutionService
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		const routeSubscription = this.activatedRoute.params.subscribe(
			params => {
				const id = params["id"];

				if (id && id.length > 0) {
					this._solutionService
						.getListSolutionObs$()
						.subscribe(listSln => {
							this.solution = listSln.find(x => x.name === id);
						});

					// this.solution = JSON.parse(
					// 	localStorage.getItem("listSolution")
					// ).find(x => x.name === id);

					/**
					 * Initialize Solution
					 */

					this.initSolution();
				}
			}
		);
		this.subscriptions.push(routeSubscription);
	}

	/**
	 * Init user
	 */
	initSolution() {
		this.createForm();
	}

	/**
	 * Create form
	 */
	createForm() {
		this.rfSolution = this.solutionFB.group({
			name: [this.solution.name, Validators.required],
			owner: [this.solution.owner, Validators.required],
			databaseName: [this.solution.databaseName, Validators.required],
			version : [this.solution.version, Validators.required],
		});
	}
	onShowFormEdit(isShow: boolean = false) {
		this.isShowFormEdit = isShow;
	}
	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `${this.layoutConfigService.getCurrentMainRoute()}/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	// /**
	//  * Refresh user
	//  *
	//  * @param isNew: boolean
	//  * @param id: number
	//  */
	// refreshUser(isNew: boolean = false, id = 0) {
	// 	let url = this.router.url;
	// 	if (!isNew) {
	// 		this.router.navigate([url], { relativeTo: this.activatedRoute });
	// 		return;
	// 	}

	// 	url = `${this.layoutConfigService.getCurrentMainRoute()}/user-management/users/edit/${id}`;
	// 	this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	// }

	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.rfSolution.markAsPristine();
		this.rfSolution.markAsUntouched();
		this.rfSolution.updateValueAndValidity();
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.rfSolution.controls;
		/** check form */
		if (this.rfSolution.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedSolution = this.prepareSolution();
		/** handle edit solution */

		// if (editedSolution.id > 0) {
		// 	this.updateUser(editedSolution, withBack);
		// 	return;
		// }

		// this.addUser(editedSolution, withBack);
	}

	/**
	 * Returns prepared data for save
	 */
	prepareSolution(): SolutionModel {
		const controls = this.rfSolution.controls;
		const _solution = new SolutionModel();
		_solution.clear();
		_solution.name = controls["name"].value;
		_solution.owner = controls["owner"].value;
		_solution.databaseName = controls["databaseName"].value;
		_solution.version = controls["version"].value;
		// _solution.image = controls["image"].value;
		return _solution;
	}

	// /**
	//  * Add User
	//  *
	//  * @param _user: User
	//  * @param withBack: boolean
	//  */
	// addUser(_user: User, withBack: boolean = false) {
	// 	this.store.dispatch(new UserOnServerCreated({ user: _user }));
	// 	const addSubscription = this.store
	// 		.pipe(select(selectLastCreatedUserId))
	// 		.subscribe(newId => {
	// 			const message = `New user successfully has been added.`;
	// 			this.layoutUtilsService.showActionNotification(
	// 				message,
	// 				MessageType.Create,
	// 				5000,
	// 				true,
	// 				true
	// 			);
	// 			if (newId) {
	// 				if (withBack) {
	// 					this.goBackWithId();
	// 				} else {
	// 					this.refreshUser(true, newId);
	// 				}
	// 			}
	// 		});
	// 	this.subscriptions.push(addSubscription);
	// }

	// /**
	//  * Update user
	//  *
	//  * @param _user: User
	//  * @param withBack: boolean
	//  */
	// updateUser(_user: User, withBack: boolean = false) {
	// 	// Update User
	// 	// tslint:disable-next-line:prefer-const

	// 	const updatedUser: Update<User> = {
	// 		id: _user.id,
	// 		changes: _user
	// 	};
	// 	this.store.dispatch(
	// 		new UserUpdated({ partialUser: updatedUser, user: _user })
	// 	);
	// 	const message = `User successfully has been saved.`;
	// 	this.layoutUtilsService.showActionNotification(
	// 		message,
	// 		MessageType.Update,
	// 		5000,
	// 		true,
	// 		true
	// 	);
	// 	if (withBack) {
	// 		this.goBackWithId();
	// 	} else {
	// 		this.refreshUser(false);
	// 	}
	// }

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = "Solution";
		if (!this.solution || !this.solution.name) {
			return result;
		}

		result = `Solution - ${this.solution.name}`;
		return result;
	}

	// /**
	//  * Close Alert
	//  *
	//  * @param $event: Event
	//  */
	// onAlertClose($event) {
	// 	this.hasFormErrors = false;
	// }

	/**
	 * Destroy subscriptions
	 */

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}