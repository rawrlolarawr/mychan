class CommentsController < ApplicationController
    def index
        comments = Post.find_by_id(params[:post_id]).comments
        render json: CommentSerializer.new(comments)
    end

    def show
        comment = Comment.find_by_id(params[:id])
        render json: CommentSerializer.new(comment)
    end

    def new
        comment = Comment.new
    end

    def create
        post = Post.find_by(id: params[:post_id])
        comment = post.comments.build(comment_params)
        post.save
    end

    private

    def comment_params
        params.require(:comment).permit(:content, :post_id)
    end
end
