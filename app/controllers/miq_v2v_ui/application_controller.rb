module MiqV2vUI
  # Common class for all plugin controllers.
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
  end
end
