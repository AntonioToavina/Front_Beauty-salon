import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShareComponent } from '../../../../../shared/Component/ShareComponent';
import { FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../staff.service';
import { MatSelectChange } from '@angular/material/select';
import { User } from '../../../../../models/User';

@Component({
    selector: 'app-staff-creation',
    templateUrl: './staff-creation.component.html',
})
export class StaffCreationComponent extends ShareComponent implements OnInit {
    img: any;
    avatarPicture: any;
    hidePassword: boolean = true;
    services: any[];
    posts: any[] = [];
    passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

    constructor(
        public matDialogRef: MatDialogRef<StaffCreationComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _staffService: StaffService,
    ) {
        super();
    }

    initForm() {
        this.form = this._formBuilder.group({
            name: ['', Validators.required],
            firstName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [Validators.required, Validators.pattern(this.passwordRegex)],
            ],
            posts: ['', Validators.required],
            information: [''],
        });
    }

    updatePostsList(event: MatSelectChange) {
        if (this.posts.filter((p) => p._id == event.value).length != 0) return;
        this.posts = [...this.posts, this.findService(event.value)];
    }

    deletePost(id: any) {
        this.posts = this.posts.filter((p) => p._id !== id);
        if (this.posts.length == 0) this.form.get('posts').setValue('');
    }

    findService(id: number) {
        return this.services.find((service) => service._id === id);
    }

    ngOnInit(): void {
        this.initForm();
        this.services = this.data.services;
    }

    closeModal() {
        this.matDialogRef.close();
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }

    onFileSelected(event: any) {
        this.avatarPicture = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            this.img = e.target.result;
        };
        reader.readAsDataURL(this.avatarPicture);
    }

    addStaff() {
        if (this.form.invalid) return;
        this.form.disable();

        let staff: User = {
            ...this.form.value,
            posts: this.buildIdArray(this.posts),
            userType: 'Staff',
        };
        let fomData = new FormData();
        fomData.set('file', this.avatarPicture);
        fomData.set('staff', JSON.stringify(staff));

        this._staffService.create(fomData).subscribe((data) => {
            if (data.state == 'error') this.alert.type = 'error';
            else {
                this.alert.type = 'success';
                this.callback = () => {
                    this.form.reset();
                    this.closeModal();
                };
            }
            this.alert.message = data.message;
            this.handleMessage();
        });
    }
}
