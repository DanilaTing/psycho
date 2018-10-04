Rails.application.routes.draw do
  resources :columns
  resources :boards
  resources :projects
  resources :tasks
  resources :cards
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "main#index"
  get :new_board_in_project, controller: :board_in_projects
end
