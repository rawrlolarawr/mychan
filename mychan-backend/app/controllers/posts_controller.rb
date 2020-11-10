class PostsController < ApplicationController
    def index
        posts = Post.all
        render json: PostSerializer.new(posts)
    end

    def results
        results = Post.search(params[:search])
    end

    def show
        post = Post.find_by_id(params[:id])
        render json: PostSerializer.new(post)
    end

    def new
        post = Post.new
    end

    def create
        post = Post.create(post_params)
    end

    private

    def post_params
        params.require(:post).permit(:title, :content)
    end
end
