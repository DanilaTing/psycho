Rails.application.routes.draw do

  namespace :react do
    get "tasks", to: "tasks#index"
    get "projects", to: "projects#index"
    get "projects/new", to: "projects#new"
    get "projects/:id", to: "projects#show"
  end



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
  resources :projects
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

  get :new_board_in_project, controller: :board_in_projects

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "react/tasks#index", controller: :react_tasks_controller
end
