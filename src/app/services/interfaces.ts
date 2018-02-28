export interface ILoginDetails {
    username:string,
    password:string
}

export interface IReviews {
    id:string,
    date:string,
    salary:string,
    type:string,
    employee:number,
    position:number
}

export interface IAuthenticationState {
    username?:string,
    id?:number,    
    isAuthenticated?:boolean,
    authenticationToken?:string
}

export interface IEmployee {
    user?: {
        id?:number,
        username?:string,
        email?:string,
        first_name?:string,
        last_name?:string,
        is_active?:boolean,
        is_staff?:boolean
    },
    position?: {
        id?:string,
        name?:string,
        level?:string,
        sort?:number
    },
    phone_number?:string,
    email?:string
    github_user?:string,
    birth_date?:string,
    gender?:string,
    race?:string,
    years_worked?:number,
    age?:number,
    days_to_birthday?:number
}