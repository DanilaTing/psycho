Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get 'react', to: 'react#index'
  resources :checklistitems
  resources :checklists
  resources :videos
  resources :links
  resources :images
  resources :attachments
  resources :columns
  resources :boards
  resources :tasks
  resources :board_in_projects
  resources :card_in_columns
  resources :react

  resources :projects do
    resources :board_in_projects
  end

  resources :cards do
    resources :card_in_columns

    member do
      get :turn_into_project
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "react#index"
  get :new_board_in_project, controller: :board_in_projects
end
