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
public class SpringBus implements Bus{
    private final Registry registry;

    public SpringBus(Registry registry) {
        this.registry = registry;
    }
    
    @Override
    public <C extends IRequest<R>, R> R execute(C request) {
        IRequestHandler<C,R> requestHandler = (IRequestHandler<C, R>)registry.get(request.getClass());
        return requestHandler.handle(request);
    }
    
}
