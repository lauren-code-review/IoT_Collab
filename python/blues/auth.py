from flask import Blueprint, request, jsonify

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.post("create_account")
def create_account():
    
    pass

@bp.post("change_pw")
def change_pw():
    pass

@bp.post("forgot_pw")
def forgot_pw():
    pass

@bp.post("change_username")
def change_username():
    pass

@bp.post("forgot_username")
def forgot_username():
    pass

@bp.get("authenticate")
def check_pw():
    pass

