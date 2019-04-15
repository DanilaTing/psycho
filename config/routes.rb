Rails.application.routes.draw do

  devise_for :users
    as :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :boards do
    resources :projects
    resources :tasks
  end

  root "boards#index"
end
