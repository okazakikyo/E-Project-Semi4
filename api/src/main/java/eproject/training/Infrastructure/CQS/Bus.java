/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eproject.training.Infrastructure.CQS;

/**
 *
 * @author THAI
 */
public interface Bus {
    <C extends IRequest<R>,R> R execute(C request);
}
