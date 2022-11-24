/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eproject.training.Infrastructure.CQS;

/**
 *
 * @author THAI
 * @param <C>
 * @param <R>
 */
public interface IRequestHandler<C extends IRequest<R>,R> {
    R handle(C request);
}
