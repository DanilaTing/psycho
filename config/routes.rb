Rails.application.routes.draw do

  devise_for :users
    as :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :tasks

  resources :boards do
    resources :projects
  end

  get 'trello_import/new_board_import'
  post 'trello_import/create_board_import'

  root 'boards#index'
end
