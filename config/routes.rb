Rails.application.routes.draw do

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  # root to: login_path

  resources :snaps
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
