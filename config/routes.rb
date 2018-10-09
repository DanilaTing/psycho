Rails.application.routes.draw do
  resources :columns
  resources :boards
  resources :projects do
    resources :board_in_projects
  end
  resources :tasks
  resources :cards
  resources :board_in_projects
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "boards#show", :id => '1'
  get :new_board_in_project, controller: :board_in_projects
end
