Rails.application.routes.draw do

	root "static_pages#home"

	scope "/:locale" do
  	devise_for :users
	end

end