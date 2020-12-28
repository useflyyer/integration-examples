Rails.application.routes.draw do
  root "application#root"
  get "/about", to: "application#about"
end
