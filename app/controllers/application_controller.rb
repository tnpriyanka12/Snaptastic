class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  before_action :fetch_user

  def check_if_logged_in
    if @current_user.nil?
      flash[:error] = "You must be logged in to view this page."
      redirect_to login_path
    end

  end

  def check_if_admin
    unless @current_user.present? && @current_user.is_admin?
      flash[:error] = "You must be an admin to view this page."
      redirect_to login_path
    end
  end

  private
  def fetch_user
    # Retrieve the currently-logged-in user's data from the database
    # (if they are actually logged in)
    if session[:user_id].present?
      @current_user = User.find_by id: session[:user_id]
    end

    # On the off change the session user ID does not exist in the
    # database (i.e. we have re-seeded the 'users' table), delete the session
    session[:user_id] = nil unless @current_user.present?
  end
end
