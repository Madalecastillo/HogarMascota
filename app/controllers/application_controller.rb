class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  after_filter :prepare_unobtrusive_flash
  before_filter :set_locale

  private

  	def set_locale
      I18n.locale = params[:locale] || extract_locale_from_accept_language_header || I18n.default_locale
    end

		def default_url_options(options = {})
			{ locale: I18n.locale }.merge options
		end

    def extract_locale_from_accept_language_header
      request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    end

end