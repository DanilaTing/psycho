Rails.application.routes.draw do
  resources :checklistitems
  resources :checklists
  resources :videos
  resources :links
  resources :images
  resources :attachments
  resources :columns
  resources :boards
  resources :projects do
    resources :board_in_projects
  end
  resources :tasks
  resources :cards do
    resources :card_in_columns
  end
  resources :board_in_projects
  resources :card_in_columns
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "boards#show", :id => '1'
  get :new_board_in_project, controller: :board_in_projects
  patch :turn_into_project, controller: :cards
end
